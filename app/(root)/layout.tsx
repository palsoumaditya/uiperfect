import Header from "@/components/landing-Page/Header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";


export const metadata:Metadata ={
          title:{
                    template:"UI Perfect an Open Source UI Component Library",
                    default: "UI Perfect"
          }
}

export default function HomeLayout({children}:{children:React.ReactNode}){
          return (
                    <>
                    <Header/>
                    <main className="relative w-full pt-0 md:pt-0">
                    {children}
                    </main>
                    <Footer/> 
                    </>
          );
}