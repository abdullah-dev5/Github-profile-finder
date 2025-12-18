import { Typography } from "@material-tailwind/react";
 export 
 default  function SimpleFooter() {
  return (
    <footer className="w-full py-4 px-4 bg-white border-t border-slate-200 text-[11px] sm:text-xs mt-auto">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <Typography color="blue-gray" className="font-normal text-center text-slate-500">
          &copy; All rights reserved
        </Typography>
      </div>
    </footer>
  );
}


