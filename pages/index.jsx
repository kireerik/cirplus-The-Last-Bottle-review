import styled, {css} from 'styled-components'

import {useState, useReducer, useEffect} from 'react'

const random = maximum =>
	Math.floor((1 + maximum) * Math.random())

, size = 30

, absolute = styled.div`
	position: absolute;
`

, square = count => styled(absolute)`
	width: ${count * size}px;
	height: ${count * size}px;
`

, position = css`
	top: ${({position: [, y]}) => y * size}px;
	left: ${({position: [x]}) => x * size}px;
`

, patchSize = 3

, Patch = styled(square(patchSize))`
	${position}
	background-color: rgba(255, 0, 0, .5);
`

, square1 = square(1)

, Bottle = styled(square1)`
	${position}
	background-color: rgba(0, 0, 0, .5);
`
, Henry = styled(square1)`
	${position}
	background-color: rgba(255, 255, 0, .5);
`

, getSize = size => size - 1

, getPosition = () => [random(getSize(42)), random(getSize(24))]

, randomAction = () => 1 + random(6 - 1)

var patch, bottle, henry, nextPlayer

export default () => {
	var [step, setStep] = useState()
	, [direction, setDirection] = useState()

	const [, update] = useReducer(() => false)

	useEffect(() => {
		patch = getPosition()

		bottle = getPosition()
		henry = getPosition()

		update()
	}, [])

	return <>
		{
			patch && bottle && henry && (() => {
				const inside = (element, otherElement, size = 1) => {
					const inside = coordinate =>
						element[coordinate] <= otherElement[coordinate]
						&& otherElement[coordinate] <= element[coordinate] + size - 1

					return inside(0) && inside(1)
				}
				, henryInside = (element, size) =>
					inside(element, henry, size)

				return !(
					henryInside(patch, patchSize)
					|| henryInside(bottle)
					|| inside(patch, bottle, patchSize)
				)
			})()
		&& <>
			direction {direction}, steps {step}
			{' '}
			<button onClick={() => {
				step = randomAction()
				setStep(step)
				direction = randomAction()
				setDirection(direction)

				const player = nextPlayer ? henry : bottle

				if (1 <= direction && direction <= 2 || direction == 8)
					player[1] -= step
				if (2 <= direction && direction <= 4)
					player[0] += step
				if (4 <= direction && direction <= 6)
					player[1] += step
				if (6 <= direction && direction <= 8)
					player[0] -= step

				nextPlayer = !nextPlayer
			}}>
				Roll Dice
			</button>
		</>}
		{patch && <Patch position={patch}/>}
		{bottle && <Bottle position={bottle}/>}
		{henry && <Henry position={henry}/>}
	</>
}