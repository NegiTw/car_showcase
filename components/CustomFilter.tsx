"use client";

import { useState, Fragment} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFIllterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({title, options, setFilter}:CustomFIllterProps) => {
  const [selected, setSelected] = useState(options[0])
 
  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          setFilter(e.value);
        }}
      >
        <div className="w-fit relative z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">
              {selected.title}
            </span>
            <Image 
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              alt="chevron up down"
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in-and-out-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>`relative cursor-default select-none px-4 py-2 ${ active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? "font-medium": "font-normal"}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter