// Import the categories data from a local JSON file
import categories from '../../assets/categories.json'

// Import Next.js's Image component for optimized image rendering
import Image from 'next/image'

// Categories component definition
export default function Categories () {
	return (
		// Section container for all categories
		<section className='max-w-6xl bg-[url("/bg-gamemodes.svg")] px-8 pb-6 flex flex-col justify-center text-slate-900'>
			
			{/* Section heading */}
			<h2 className='text-2xl mb-4 font-medium mt-4 lg:mt-0'>Categories</h2>
			
			{/* Grid layout for category boxes */}
			<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5'>
				
				{/* Map through categories and render each one */}
				{categories.map(category => (
					<li
						key={category.id} // Unique key for each category
						title={category.name} // Tooltip title
						className="relative group rounded-xl p-5 max-w-xs aspect-square shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.04] flex flex-col items-center justify-center text-white"
						style={{
							// Background with gradient effect and opacity overlay
							background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}CC 100%)`,
							// Border color matching category
							border: `2px solid ${category.color}`
						}}
					>
						{/* Decorative white abstract blob shape in background */}
						<svg
							className="absolute w-full h-full -z-10 opacity-10 scale-[2] rotate-12 pointer-events-none"
							viewBox="0 0 200 200"
						>
							<path
								fill="white"
								d="M45.4,-63.1C58.3,-53.7,67.4,-39.7,70.2,-25.1C72.9,-10.4,69.3,5,63.3,18.9C57.3,32.9,48.9,45.5,37.1,52.3C25.4,59.1,10.2,60.2,-4.4,65.4C-18.9,70.6,-37.9,80.1,-50.5,75C-63.1,69.8,-69.3,50,-71.2,32.1C-73.1,14.3,-70.7,-1.5,-65.5,-17.2C-60.3,-32.8,-52.3,-48.3,-40.4,-58.5C-28.5,-68.6,-14.2,-73.3,0.9,-74.6C16,-76,32.1,-73.1,45.4,-63.1Z"
								transform="translate(100 100)"
							/>
						</svg>

						{/* Category icon */}
						<Image
							className="drop-shadow-md z-10"
							src={`/categories-icons/${category.name.toLowerCase()}.svg`} // Dynamic image source based on category name
							alt={category.name} // Accessibility alt text
							width={36}
							height={36}
						/>

						{/* Category name */}
						<h3 className="text-lg mt-2 text-center drop-shadow-md z-10">{category.name}</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
