export default function App() {
  return (
    <div className="p-5">
      <h1>Hi!</h1>
      <MyButton/>
    </div>
  );
}

function MyButton(){
  return(
    <button className="btn">Hello, daisyUI!</button>
  );
}
