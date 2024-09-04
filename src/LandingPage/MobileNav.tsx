import React from 'react'
import { IoMdMenu } from "react-icons/io";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Separator } from "@/components/ui/separator"
import Navitems from './Navitems';

function MobileNav() {
  return (
    <nav className=' text md:hidden mr-[-1.4rem]'>
        <Sheet >
  <SheetTrigger className='align-middle mt-2 mr-4'>
    <span className='text-2xl'><IoMdMenu  /></span>
  </SheetTrigger>
  <SheetContent className='flex flex-col gap-6   game-color md:hidden'>
   <div>
    <h1 className='font-bold  text-purple-400'>
       GameVault
    </h1>
    </div> 
    <Separator/>
    <Navitems/>
  </SheetContent>
</Sheet>
    </nav>
  )
}

export default MobileNav