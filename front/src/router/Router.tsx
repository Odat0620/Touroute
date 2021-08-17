import { memo, VFC } from "react";
import { Route, Switch } from "react-router";

import { SignUp } from "../components/pages/auth/SignUp";
import { SignIn } from "../components/pages/auth/SignIn";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { User } from "../components/pages/users/User";
import { CreatePost } from "../components/pages/posts/CreatePost";
import { EditUser } from "../components/pages/users/EditUser";
import { Post } from "../components/pages/posts/Post";

export const Router: VFC = memo(() => {
  return (
    <HeaderLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/:id" component={User} />
        <Route exact path="/users/edit/:id" component={EditUser} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/posts/:id" component={Post} />
        <Route path="*" component={Page404} />
      </Switch>
    </HeaderLayout>
  );
});
