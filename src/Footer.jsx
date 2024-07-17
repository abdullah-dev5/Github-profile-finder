import { Typography } from "@material-tailwind/react";
 export 
 default  function SimpleFooter() {
  return (
    <footer className="flex fixed bottom-0 p-6 w-full items-center justify-center  bg-slate-900">
      <Typography color="blue-gray" className="font-normal bg-slate-500 " >
        &copy; All Rights are Reserved
      </Typography>
   
    </footer>
  );
}


