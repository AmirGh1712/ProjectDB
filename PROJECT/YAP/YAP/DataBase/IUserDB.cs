using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    interface IUserDB
    {
        public Task AddUser(User user);

        public Task<Boolean> CheckUsername(string uname);

        public Task<User> CheckUser(string uname, string password);
    }
}
