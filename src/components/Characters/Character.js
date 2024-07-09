function Character({ img, name, status, species }) {
  let statusColor = ''
  switch (status) {
    case 'Alive':
        statusColor = 'w-3 h-3 rounded-full bg-green-600'
        break;
    case 'Dead':
        statusColor = 'w-3 h-3 rounded-full bg-red-600'
        break;
    default:
        statusColor = 'w-3 h-3 rounded-full bg-blue-600'
        break;
  }
  return (
    <div className="flex flex-col w-full h-auto sm:flex-row sm:w-[500px] sm:h-[160px] rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300">
    <img src={img} alt="img" className="rounded-t-md rounded-b-none sm:rounded-md"/>
    <div className="flex flex-col gap-2 px-6 py-4">
      <p className="text-xl font-bold">{ name }</p>
      <div className="flex gap-2 items-center">
        <span className={statusColor}></span>
        <p>{ status }</p>
        <span>-</span>
        <p>{ species }</p>
      </div>
    </div>
  </div>
  );
}

export default Character;
