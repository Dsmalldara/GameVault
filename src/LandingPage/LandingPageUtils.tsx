/* eslint-disable @typescript-eslint/no-explicit-any */
export const reviews = [
    {
      quote: "This product has revolutionized our workflow. It's intuitive, powerful, and a joy to use every day.",
      name: "Sarah Johnson",
      role: "Senior Developer",
      company: "TechCorp",
      avatarSrc: "/api/placeholder/32/32"
    },
    {
      quote: "I've never seen such a responsive and helpful customer support team. They go above and beyond every time.",
      name: "Michael Lee",
      role: "Project Manager",
      company: "InnoSolutions",
      avatarSrc: "/api/placeholder/32/32"
    },
    {
      quote: "The features offered by this platform have helped us increase our productivity by 50%. It's a game-changer.",
      name: "Emily Chen",
      role: "CEO",
      company: "StartUp Inc.",
      avatarSrc: "/api/placeholder/32/32"
    }
  ];

  type headerLinks = {
    title: string,
    href?:string
    className?: string
}
export const headerLink:headerLinks[] = [
    {
        title: 'Crowdfunding',
        href: "/crowdfunding"
    },
    {
        title: 'Social Enterprise',
    },
    {
      title: 'Play for good  😊',
      href: "/play-for-good",
      className:"bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-[500px] hover:from-purple-600 hover:to-blue-600 transition duration-300"
    }

]