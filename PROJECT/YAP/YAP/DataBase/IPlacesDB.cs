using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public interface IPlacesDB
    {
        /// <summary>
        /// Returns all the places from the DB filtered by the filter.
        /// </summary>
        /// <param name="filter">The filter for the places.</param>
        /// <returns>List of places.</returns>
        public IAsyncEnumerable<Place> GetPlaces(Filter filter);
    }
}
