using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using MySql.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public class MyUserDB : IUserDB
    {
        private readonly string connectionString;

        public MyUserDB(IConfiguration configuration)
        {
            // The connection string to the DB
            connectionString = configuration["DefConnectionString"];
        }

        public MyUserDB(string tryconn)
        {
            // The connection string to the DB
            connectionString = tryconn;
        }

        public async Task AddUser(User user)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // The insert command
            using var command = new MySqlCommand(
                "INSERT into users (username, password, fullname) VALUES (@username, @password, @fullname)", con);
            // Insert the parameters
            command.Parameters.AddWithValue("@username", user.Username);
            command.Parameters.AddWithValue("@password", user.Password);
            command.Parameters.AddWithValue("@fullname", user.Fullname);
            try
            {
                // Execute
                var res = await command.ExecuteNonQueryAsync();

                // Failed
                if (res == 0)
                    throw new ArgumentException("Did not succeed adding user " + user.Username);
            }
            // The id was already there
            catch (Exception)
            {
                throw new ArgumentException("username already in database.");
            }
        }

        public async Task<User> CheckUser(string uname, string password)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM users WHERE username = @username AND password = @password", con);
            command.Parameters.AddWithValue("@username", uname);
            command.Parameters.AddWithValue("@password", password);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            User user = null;
            if (await rdr.ReadAsync())
            {
                string newusername = rdr.GetString(0);
                string newpassword = rdr.GetString(1);
                string newfullname = rdr.GetString(2);
                user = new User(newusername, newpassword, newfullname);
            }
            return user;
        }

        public async Task<bool> CheckUsername(string uname)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM users WHERE username = @username", con);
            command.Parameters.AddWithValue("@username", uname);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            return rdr.HasRows;
        }
    }
}
