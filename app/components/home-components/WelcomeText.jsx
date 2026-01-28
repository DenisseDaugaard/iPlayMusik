export default function HomeText({title, text}) {
    return(
         <div className="p-8">
        <h1 className="font-bold text-1xl text-center">{title}</h1>
        <p className="text-center">{text}</p>
      </div>
    )
}