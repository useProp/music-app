import React from 'react';
import MainLayout from "../layouts/MainLayout";

const Index = () => {
  return (
   <>
     <MainLayout>
       <div className="center">
         <h1>Welcome</h1>
         <h3>Most popular tracks in one place :)</h3>
       </div>

       <style jsx>
         {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
       `}
       </style>
     </MainLayout>
   </>
  );
};

export default Index;
