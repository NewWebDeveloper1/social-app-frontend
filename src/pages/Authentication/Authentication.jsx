// import { useState } from "react";
import { Card, Grid } from "@mui/material";
import { Formik } from "formik";
import Login from "./Login";
import Register from "./Register";
import { Outlet } from "react-router-dom";

const Authentication = () => {
  // const [register, setRegister] = useState(false);

  return (
    <>
      <Grid container>
        <Grid size={7}>
          <img
            className="h-screen"
            src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
          />
        </Grid>
        <Grid size={5}>
          <div className="px-5 mx-5 flex flex-col justify-center h-full align-center">
            <Card className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="log text-center text-6xl text-blue-400 mb-4 w-full">
                  Social App
                </h1>
                <p className="text-center text-blue-400 text-sm w-85">
                  Connecting Lives, Sharing Stories: Your Social World, Your Way
                </p>
              </div>
              {/* {register ? (
                <Register toRegister={setRegister} />
              ) : (
                <Login toRegister={setRegister} />
              )} */}
              <Outlet />
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Authentication;
