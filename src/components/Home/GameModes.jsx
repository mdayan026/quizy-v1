// Importing necessary icons from react-icons
import { ImInfinite } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { TbDeviceGamepad2 } from 'react-icons/tb'

// Array of game mode objects with icon, title, and description
const gameModes = [
	{
		icon: <TbDeviceGamepad2 className='text-3xl' />, // Icon for Classic mode
		title: 'Classic',
		description: 'Complete questions without fail to win! You have wildcards that can help you'
	},
	{
		icon: <ImInfinite className='text-3xl' />, // Icon for Infinite mode
		title: 'Infinite',
		description: 'Break your record by completing as many questions as you can! You can use wildcards'
	},
	{
		icon: <BiTimeFive className='text-3xl' />, // Icon for Time mode
		title: 'Time',
		description: 'Complete questions within the time limit to win! You can use wildcards'
	}
]

// Functional component to render the game modes section
export default function GameModes () {
	return (
		<section
			className='lg:max-w-6xl mx-auto lg:col-start-1 lg:col-end-2 px-8 py-6 flex flex-col justify-center bg-[url("/bg-gamemodes.svg")] text-slate-900 w-full'
		>
			{/* Section heading */}
			<h2 className='text-2xl mb-4 font-medium'>Game modes</h2>

			{/* Navigation container for the game modes */}
			<nav>
				<ul className='flex flex-col sm:flex-row justify-center gap-5'>
					{/* Mapping through gameModes array to render each mode */}
					{gameModes.map((mode, index) => (
						<li
							key={index + mode.title}
							className='bg-neutral-300 max-w-sm md:max-w-none bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all hover:bg-opacity-100 hover:bg-#ffff00 shadow-sm mx-auto'
						>
							{/* Game mode icon */}
							{mode.icon}

							{/* Game mode title */}
							<h3 className='text-xl font-medium my-1'>{mode.title}</h3>

							{/* Game mode description */}
							<p className='text-sm'>{mode.description}</p>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}
