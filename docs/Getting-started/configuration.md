# Configuration

Once the system has been installed and the environment variables have been added to the `.env.deploy` file, you can start configuring the system to begin using it.

:::info
Currently, the system is intended to be tested by system **administrators**. In future versions, usage will be extended to other roles.
:::

1. **Access the Documentation:**
   Go to `http://localhost:3001/docs` and register as a user using the Sign Up endpoint.
   <p align="center">
   <img src="\img\swagger.png" alt="portada" width="80%" height="80%"/>
   Figure 1. API Documentation
   </p>

2. **Check Registered Users:**
   Retrieve your username and encrypted password from the list of registered users.

3. **Edit Configuration File:**
   Navigate to the `./node-red` directory created during the system installation and open the `settings.js` file. Enter your username and password in the following section:

   ```javascript
    ...
    httpNodeAuth: {user:"USERNAME",pass:"HASHED_PASSWORD"},
    adminAuth: {
        type: "credentials",
        users: [{
            username: "USERNAME",
            password: "HASHED_PASSWORD",
            permissions: "*"
        }]
    },
    ...
   ```

4. **Start Using STATUS:**
   Begin utilizing the system!

By following these steps, you'll be able to set up and start using the system effectively. For any issues or further configurations, please refer to the system documentation or contact the [support team](https://github.com/orgs/statuscompliance/people).
