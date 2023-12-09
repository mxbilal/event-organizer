import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage/HomePage";
import { Suspense, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import InboxPage from "./InboxPage/InboxPage";
import LivePollPage from "./LivePollPage/LivePollPage";
import AskQuestion from "./AskQuestionPage/AskQuestion";
import Participants from "./ParticipantsPage/Participants";
import EventAgenda from "./EventAgendaPage/EventAgenda";
import ParticipantProfile from "./ParticipantsPage/ParticipantProfile/ParticipantProfile";
import ParticipantChat from "./ParticipantsPage/ParticipantChat/ParticipantChat";
import ForgetPassword from "./SignUpPage/ForgetPassword";
import setAuthToken from "./auth/SetAuthToken";
import ProtectedRoute from "./auth/ProtectedRoute";
import jwt_decode from "jwt-decode";
import ChangePassword from "./ChangePassword";
import ResetPassword from "./SignUpPage/ResetPassword";
import EventAgendaDetail from "./EventAgendaPage/EventAgendaDetail/EventAgendaDetail";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  // setInterval(() => {
  // refesh token call
  //   if(token){
  //     var decode = jwt_decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3ODEwODc2LCJpYXQiOjE2NTc3NzQ5MDEsImp0aSI6ImM2ZDljN2QzMGMwMTRhOTA5YzZjZTEwZGZhNTBhMTRlIiwidXNlcl9pZCI6M30.Lxsnf9inK6fjpMpGhq2cnHb8By--oJf4wgqLP0d7qOo")
  //   // console.log(decode.exp)
  //   console.log("ref",new Date("2022-07-14T15:01:16").getTime())
  //   // console.log("ref ex1",decode.exp+"000")
  //   console.log("cur",new Date().getTime())
  //   }
  // }, 1000);
  //
  return (
    <Layout>
      <Suspense
        fallback={<TailSpin color="#00BFFF" height={80} width={80} />}
      />
      <Routes>
        <Route
          path="/events/:id/:slug/inbox/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route path="/events/:id/:slug/inbox/" element={<InboxPage />} />
        </Route>
        <Route
          path="/events/:id/:slug/polls/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route path="/events/:id/:slug/polls/" element={<LivePollPage />} />
        </Route>
        <Route
          path="/events/:id/:slug/questions/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route
            path="/events/:id/:slug/questions/"
            element={<AskQuestion />}
          />
        </Route>
        <Route
          path="/events/:id/:slug/participants/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route
            path="/events/:id/:slug/participants/"
            element={<Participants />}
          />
        </Route>
        <Route
          path="/events/:id/:slug/participants/profile/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route
            path="/events/:id/:slug/participants/profile/"
            element={<ParticipantProfile />}
          />
        </Route>
        <Route
          path="/events/:id/:slug/participants/chat/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route
            path="/events/:id/:slug/participants/chat/"
            element={<ParticipantChat />}
          />
        </Route>
        <Route
          path="/events/:id/:slug/agenda/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route path="/events/:id/:slug/agenda/" element={<EventAgenda />} />
        </Route>
        <Route
          path="/events/:id/:slug/agenda/:agendaTitle/"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route
            path="/events/:id/:slug/agenda/:agendaTitle/"
            element={<EventAgendaDetail />}
          />
        </Route>
        <Route
          path="/password/change"
          element={<ProtectedRoute redirect="/sign-in" />}
        >
          <Route path="/password/change" element={<ChangePassword />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user/complete-profile/:key" element={<SignUpPage />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/key/:key" element={<ResetPassword />} />

        <Route path="*" element={<>No Page Found</>} />
      </Routes>
    </Layout>
  );
}

export default App;
