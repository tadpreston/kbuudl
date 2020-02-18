import React from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import axios from "axios";

function Profile({ user }) {
  const [updatedUser, setUpdatedUser] = React.useState({...user});
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const isUser = Object.values(updatedUser).every(el => Boolean(el))
    isUser ? setDisabled(false): setDisabled(true);
  }, [updatedUser]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/profile`;
      const payload = { ...updatedUser };
      const response = await axios.patch(url, payload);
      handleLogin(response.data);
    } catch(error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false);
    }
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setUpdatedUser(prevState => ({...prevState, [name]: value}));
  }

  return <>
    <Message
      attached
      icon="settings"
      header="Profile"
      content="Update your user profile"
      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={updatedUser.email}
          onChange={handleChange}
        />
        <Button
          disabled={loading}
          icon="signup"
          type="submit"
          color="orange"
          content="Update"
        />
      </Segment>
    </Form>
  </>
}

export default Profile;
