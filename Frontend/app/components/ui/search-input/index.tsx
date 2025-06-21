import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface SearchInputProps {
    input: any;
    onChange: any;
}

const SearchInput = ({input, onChange}: SearchInputProps) => {
  return (
    <div className='flex items-center gap-3 px-4 rounded-lg text-sm border bg-neutral-100 mt-5'>
        <MagnifyingGlassIcon className='size-5 text-neutral-600' />
        <input
            placeholder='Think of something specific for 20 seconds'
            type="text"
            value={input}
            onChange={onChange}
            className='py-3 focus:outline-0 bg-transparent w-full'
        />
    </div>
  )
}

export default SearchInput
