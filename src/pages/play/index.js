import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PageLoading from '../../components/PageLoading'
import PageError from '../../components/PageError'
import PlayHeader from '../../components/Play/PlayHeader'
import GameInfo from '../../components/Play/GameInfo'
import Footer from '../../components/PageFooter'
import Questions from '../../components/Questions/Questions'

import queryValidator from '../../helpers/gameConfig'
import categories from '../../assets/categories.json'
import { useBoundStore } from '../../store/useBoundStore'

export default function Play() {
    // Accessing state and actions from the store
    const { loading, error, getQuestions, setQueries } = useBoundStore(state => state)
    const router = useRouter()

    // Fetch questions and validate query parameters when the router is ready
    useEffect(() => {
        if (router.isReady) {
            // Validate the query parameters from the URL
            const validQuery = queryValidator(router.query)

            // Map category IDs to their names
            const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)

            // Set the validated queries in the store
            setQueries(validQuery)

            // Fetch questions based on the selected categories and mode
            getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
        }
    }, [router.isReady])

    // Warn the user before leaving the page
    useEffect(() => {
        window.onbeforeunload = () => 'Are you sure you want to leave?'
    }, [])

    return (
        <>
            {/* Set the page title */}
            <Head><title>Quizy</title></Head>

            {/* Show loading screen if data is being fetched */}
            {loading && <PageLoading />}

            {/* Show error screen if there is an error */}
            {error[0] && <PageError />}

            {/* Render the main content if there is no loading or error */}
            {!loading && !error[0] && <>
                {/* Header section */}
                <PlayHeader />

                {/* Game information section */}
                <GameInfo />

                {/* Questions section */}
                <Questions />

                {/* Footer section */}
                <Footer alert={true} />

                {/* Global styles for the page */}
                <style jsx global>
                    {`
                    body {
                        background: url(bg.jpg) center;
                        background-size: 100% 100%;
                    }

                    @media (max-width: 1030px) {
                        body {
                            background-size: auto 100%;
                        }
                    }
                `}
                </style>
            </>}
        </>
    )
}
