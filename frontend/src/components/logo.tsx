import React from 'react'

export default function Logo(): JSX.Element {
	return (
		<svg viewBox='0 0 135 167' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<mask
				id='mask0'
				mask-type='alpha'
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='135'
				height='167'>
				<path d='M67 0L42 167H67L95 0H67Z' fill='#C4C4C4' />
				<path d='M107 0L82 167H107L135 0H107Z' fill='#C4C4C4' />
				<path d='M25 0L0 167H25L53 0H25Z' fill='#C4C4C4' />
			</mask>
			<g mask='url(#mask0)'>
				<rect width='135' height='167' fill='url(#paint0_linear)' />
			</g>
			<defs>
				<linearGradient
					id='paint0_linear'
					x1='67.5'
					y1='0'
					x2='67.5'
					y2='167'
					gradientUnits='userSpaceOnUse'>
					<stop stopColor='#0194FF' />
					<stop offset='0.9999' stopColor='#00FDA2' />
				</linearGradient>
			</defs>
		</svg>
	)
}
