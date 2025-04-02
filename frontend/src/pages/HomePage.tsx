import { TbMusicHeart } from "react-icons/tb";
import Header from '../components/Header';


const HomePage = () => {

    return (
    <div>
        <Header page={location.pathname}/>
        <div className="flex-row justify-items-center w-auto h-[300px] bg-slate-800 rounded-md m-[10px] p-10" >
            <TbMusicHeart className="text-9xl hover:text-teal-300"/>
            <h1 className="hover:text-teal-300">Chromatic Music</h1>
            <h2 className="text-lg">Musical Instruments and Accessories</h2>
        </div>
    </div>
    )
}
export default HomePage;