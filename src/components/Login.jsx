export function Login() {
  return (
    <div>
      <form>
        <label className="block">
          <span className="block text-sm font-medium text-white">Username</span>
          <input
            type="text"
            placeholder="aiman"
            className="block min-w-0 grow py-1.5 pl-1 pr-3 bg-white placeholder:text-slate-700"
          />
          <span className="block text-sm font-medium text-white">Password</span>
          <input
            type="text"
            placeholder="........"
            className="block min-w-0 grow py-1.5 pl-1 pr-3 bg-white placeholder:text-slate-700"
          />
          <button className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Login</button>
        </label>
      </form>
    </div>
  );
}
