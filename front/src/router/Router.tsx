import { memo, VFC } from "react";
import { Route, Switch } from "react-router";

import { SignUp } from "../components/pages/auth/SignUp";
import { SignIn } from "../components/pages/auth/SignIn";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { User } from "../components/pages/users/User";
import { AuthProvider } from "../providers/auth/AuthProvider";
import { CreatePost } from "../components/pages/posts/CreatePost";

export const Router: VFC = memo(() => {
  return (
    <AuthProvider>
      <HeaderLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/createpost" component={CreatePost} />
          <Route path="*" component={Page404} />
        </Switch>
      </HeaderLayout>
    </AuthProvider>
  );
});
