import CountDown from "@/Components/Timer/CountDown"
import StopWatch from "@/Components/Timer/StopWatch"

const metadata = {
    title: "Timers",
    description: 'here you can find nice stop watch and countdown timer'
}

export default function TimerPage() {
    return (
        <div>
            <StopWatch />

            <CountDown duration={5_000}/>
        </div>
)}