using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public interface IPlacesDB
    {
        public IAsyncEnumerable<Place> GetPlaces(Filter filter);
    }
}
