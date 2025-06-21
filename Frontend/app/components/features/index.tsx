import React from 'react'
import BrainIcon from '@/app/assets/icons/brain.svg'
import TechRevolveIcon from '@/app/assets/icons/tech-revolve.svg'
import Image from 'next/image'

const Features = () => {
  const features = [
    {
      iconSrc: BrainIcon,
      title: "Unlock Your Mind's Potential",
      description: "Sign up to enter the world of brain-computer interfaces and control the future with your thoughts."
    },
    {
      iconSrc: TechRevolveIcon,
      title: "Join the Next Tech Revolution",
      description: "Register today and experience the power of thought-driven digital interaction."
    }
  ];
  return (
    <div className='bg-neutral-100 flex flex-col gap-5 rounded-lg mx-5 lg:mx-0 lg:rounded-none py-5 px-4 lg:p-0 lg:bg-transparent' >
      {features.map((feature, index) => (
        <div key={index} className="flex gap-4 items-start">
            <div className='flex items-center justify-center bg-white rounded-md border p-2.5 lg:p-3' >
              <Image loading="lazy" src={feature.iconSrc} alt="logo" className="w-5 lg:w-6" />
            </div>
            <div className="flex flex-col grow shrink-0 basis-0 w-fit">
              <h3 className="self-start text-[13px] lg:text-sm font-semibold text-black">{feature.title}</h3>
              <p className="mt-2 text-xs leading-6 text-zinc-600">{feature.description}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Features
