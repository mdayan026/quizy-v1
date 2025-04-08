// Import category data (for dynamic color changes)
import categories from '../../../public/../public/assets/categories.json'

// Import the footer component
import PageFooter from '../PageFooter'

// Import the sound-playing helper
import playSound from '../../helpers/playSound'

// MainHome component definition
export default function MainHome () {

	// Handle hover effect on title letters
	function handleTitleHover (e) {
		// Add a jello animation class
		e.target.classList.add('jello-vertical')

		// Change the text color to a random category color
		e.target.style.color = categories[Math.floor(Math.random() * categories.length)].color

		// Remove the animation class after animation ends
		e.target.addEventListener('animationend', () => e.target.classList.remove('jello-vertical'))
	}

	// Reset title letter color on mouse leave
	const handleTitleLeave = (e) => (e.target.style.color = 'white')

	// Handle "Play" button click
	function handlePlay () {
		playSound('pop') // Play sound effect
		document.getElementById('newGameDialog')?.showModal() // Open game dialog if it exists
	}

	return (
		// Main content wrapper
		<main className='mainHome max-w-6xl relative mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-between items-center px-5 md:px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-center text-white'>
			
			{/* Title and description section */}
			<article>
				{/* Animated title */}
				<h1 className='text-8xl font-medium w-full uppercase z-10 relative' translate='no'>
					{/* Split "Quizy" into individual letters for interaction */}
					{'Quizy'.split('').map((letter, index) => (
						<span
							key={index}
							id={letter + index + 10}
							className='relative inline-block transition-all duration-300'
							onMouseEnter={handleTitleHover}
							onMouseLeave={handleTitleLeave}
						>
							{letter}
						</span>
					))}
				</h1>

				{/* Decorative glowing background box behind the title */}
				<div className='bg-[#1404f6] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0 bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all  hover:bg-opacity-100 hover:bg-[#1404f6]'></div>

				{/* Subheading text */}
				<p className='mb-20 relative text-[#ffff00]'>
					Play an infinite number of possible questions!
				</p>
			</article>

			{/* Play button */}
			<button
				onClick={handlePlay}
				id='play'
				href='play'
				className='btn-primary uppercase px-6 py-4 text-lg max-w-md w-[50%] mx-auto mt-10'
			>
				Play
			</button>

			{/* Page footer */}
			<PageFooter />
		</main>
	)
}
