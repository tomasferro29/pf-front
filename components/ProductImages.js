import styled from "styled-components"

export default function ProductImages({images}) {
	
	const Image = styled.img`
		max-width: 100%;
	`;

	return(
		<>
			<Image src={images?.[0]} />
		</>
	)
}


// 17:14
			// <div>
			// 	{images.map(image => (
			// 		<div><Image src={image} alt='image' /></div>
			// 	))}
			// </div>