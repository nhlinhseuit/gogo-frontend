import Image from 'next/image'
import React from 'react'

const MyRoundedAvatar = ({img} : {img: string}) => {
  return <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: "220px",
            height: "220px",
            position: "relative",
            border: "5px solid #8dd3bb",
          }}
        >
          <Image
            src={img}
            alt="avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
}

export default MyRoundedAvatar