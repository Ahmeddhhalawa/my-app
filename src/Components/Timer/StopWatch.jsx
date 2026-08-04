"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useReducer } from "react"
import Button from "../UiElements/Button"

const intialValues = {time: 0, startTime: null, elapsedTime: 0, isRunning: false}
const reducer = (timer, action) => {
    const { type } = action
    const { startTime, elapsedTime} = timer
    switch(type) {
        case "start":
            return {time: 0, startTime: Date.now(), elapsedTime: 0, isRunning: true}
        case "pause":
            const currentTime = Date.now() - startTime + elapsedTime
            return {...timer, time: currentTime, elapsedTime: currentTime, isRunning: false}
        case "resume":
            return {...timer, startTime: Date.now(), isRunning: true}
        case "reset":
            return {time: 0, startTime: null, elapsedTime: 0, isRunning: false}
        case "setTime":
            return {...timer, time: Date.now() - startTime + elapsedTime }        
    }
    return timer
}
export default function StopWatch() {
    const [timer, dispatch] = useReducer(reducer, intialValues)
    const {time, startTime, elapsedTime, isRunning} = timer

    const start = () => dispatch({type: "start"})
    const resume = () => dispatch({type: "resume"})
    const pause = () => dispatch({type: "pause"})
    const reset = () => dispatch({type: "reset"})

    useEffect(() => {
        if(!isRunning) return
        const interval = setInterval(() => {
            dispatch({type: "setTime"})
        }, 10)
        return () => clearInterval(interval)
    }, [isRunning, startTime, elapsedTime])

    const minutes = Math.floor(time / (60000)).toString().padStart(2, "0")
    const seconds = Math.floor(time % (60000) / 1000).toString().padStart(2, "0")
    const mill = Math.floor((time % 1000) / 10).toString().padStart(2, "0")
    return (
        <div>
            <p>{minutes}:{seconds}:{mill}</p>
            <div>
                {!isRunning && !elapsedTime
                ? (<Button success onClick={start} disabled={isRunning}>Start</Button>)    
                : (<Button outline onClick={resume} disabled={isRunning}>Resume</Button>)
            } 
                <Button danger onClick={pause} disabled={!isRunning}>Pause</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
)}