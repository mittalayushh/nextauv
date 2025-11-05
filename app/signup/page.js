// "use client";
// import React, { useState } from "react";
// import { Label } from "../../components/ui/label";
// import { Input } from "../../components/ui/input";
// import { cn } from "@/lib/utils";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

// export default function SignupForm() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signup Data:", formData);
//     // here you can call your signup API or JWT flow
//   };

//   return (
//     <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
//       <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
//         Welcome to NextAUV!
//       </h2>
//       <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
//         Sign up below to set sail!
//       </p>

//       <form className="my-8" onSubmit={handleSubmit}>
//         {/* Name Fields */}
//         <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
//           <LabelInputContainer>
//             <Label htmlFor="firstname">First Name</Label>
//             <Input
//               id="firstname"
//               type="text"
//               placeholder="Luffy"
//               value={formData.firstname}
//               onChange={handleChange}
//             />
//           </LabelInputContainer>

//           <LabelInputContainer>
//             <Label htmlFor="lastname">Last Name</Label>
//             <Input
//               id="lastname"
//               type="text"
//               placeholder="Sama"
//               value={formData.lastname}
//               onChange={handleChange}
//             />
//           </LabelInputContainer>
//         </div>

//         {/* Email */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="nextauv@gmail.com"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Password */}
//         <LabelInputContainer className="mb-6">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             placeholder="••••••••"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-md dark:from-zinc-900 dark:to-zinc-900"
//         >
//           Sign Up →
//           <BottomGradient />
//         </button>

//         {/* Divider */}
//         <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

//         {/* Social Signup Buttons */}
//         <div className="flex flex-col space-y-4">
//           <SocialButton
//             icon={<IconBrandGoogle className="h-4 w-4" />}
//             text="Continue with Google"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// /* 🔹 Small Reusable Components */

// const SocialButton = ({ icon, text }) => (
//   <button
//     type="button"
//     className="group/btn flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-sm dark:bg-zinc-800 dark:text-neutral-200 dark:shadow-[0px_0px_1px_1px_#262626]"
//   >
//     {icon}
//     <span className="text-sm">{text}</span>
//     <BottomGradient />
//   </button>
// );

// const LabelInputContainer = ({ children, className }) => (
//   <div className={cn("flex w-full flex-col space-y-2", className)}>
//     {children}
//   </div>
// );

// const BottomGradient = () => (
//   <>
//     <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
//     <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
//   </>
// );
import React from 'react'

function page() {
  return (
    <div>signup page</div>
  )
}

export default page