import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import JsxForm from './JsxForm'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '../../helpers/playSound'
import queryValidator from '../../helpers/gameConfig'
import categoriesJSON from '../../../public/assets/categories.json'
import { useBoundStore } from '../../store/useBoundStore'

export default function NewGameForm () {
	// State and store access
	const { getQuestions, cleanQuestions, queries, setQueries, cleanWildCards } = useBoundStore(state => state)
	const [nowQueries, setNowQueries] = useState(queries)
	const router = useRouter()
	const dialog = useRef(null)

	// Sync local state with store queries
	useEffect(() => setNowQueries(queries), [queries])

	// If user is on /play page, validate and set queries from the URL
	useEffect(() => {
		if (router.isReady && router.pathname === '/play') {
			setQueries(queryValidator(router.query))
		}
	}, [router.isReady])

	// Handle changes to input fields (sliders, checkboxes, dropdowns)
	function handleInputs (e) {
		// Toggle game modes (infinitymode or timemode)
		if (e.target.name === 'infinitymode' || e.target.name === 'timemode') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')

			// Flip the value for infinitymode, use checked value for timemode
			return setNowQueries({
				...nowQueries,
				[e.target.name]: e.target.name === 'infinitymode'
					? !e.target.checked
					: e.target.checked
			})
		}

		// Handle category selection checkboxes
		if (e.target.name === 'categories') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')

			return setNowQueries({
				...nowQueries,
				[e.target.name]: e.target.checked
					? [...nowQueries.categories, e.target.value]
					: nowQueries.categories.filter(cat => cat !== e.target.value)
			})
		}

		// For all other input types (like sliders or dropdowns)
		playSound('pop')
		setNowQueries({
			...nowQueries,
			[e.target.name]: e.target.value
		})
	}

	// Submit the form, update query, and start the game
	function handleSubmit (e) {
		e.preventDefault()
		cleanQuestions()     // Clear any previous questions
		cleanWildCards()     // Reset wildcards

		// Build query string for URL
		const query = Object.keys(nowQueries)
			.map(key => `${key}=${nowQueries[key]}`)
			.join('&')

		// Update queries in store after validating
		setQueries(queryValidator(nowQueries))

		// Push new query to router
		router.push({ pathname: '/play', query })

		// Extract category names for fetching questions
		const cate = nowQueries.categories.map(
			cat => categoriesJSON.find(c => c.id === cat).name
		)

		// If already on play page, fetch new questions
		if (router.pathname === '/play') {
			getQuestions(cate, nowQueries.infinitymode ? 5 : nowQueries.questions)
		}

		// Close the dialog after submission
		closeDialog()
	}

	// Close dialog if user clicks outside the modal box
	function clickOutsideDialog (e) {
		const rect = dialog.current.getBoundingClientRect()
		if (
			e.clientX < rect.left || e.clientX > rect.right ||
			e.clientY < rect.top || e.clientY > rect.bottom
		) {
			closeDialog()
		}
	}

	// Handles animation and closing of dialog
	function closeDialog () {
		playSound('pop-down')                     // Play close sound
		dialog.current.classList.add('hide')      // Add animation class

		// Remove animation class and close after animation ends
		function handleAnimationEnd () {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<dialog
			ref={dialog}
			onClick={(e) => clickOutsideDialog(e)}
			id="newGameDialog"
			className='fixed top-1/2 w-5/6 sm:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-8 md:px-11'
		>
			{/* Close button */}
			<button
				className='absolute top-2 right-2 text-3xl hover:scale-110 transition-all'
				onClick={closeDialog}
			>
				<IoCloseSharp />
			</button>

			{/* Form UI */}
			<form onSubmit={(e) => e.preventDefault()} >
				{/* Game options form section */}
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 md:mb-8'>
					<JsxForm handleInputs={handleInputs} nowQueries={nowQueries} />
				</div>

				{/* Submit button */}
				<button
					type='submit'
					className='btn-primary uppercase py-3 px-6 w-full tracking-widest'
					onClick={(e) => handleSubmit(e)}
				>
					New game
				</button>
			</form>
		</dialog>
	)
}
