using DomainModel.Services;
using System;

namespace DomainModelServiceImplementations.DateTimeService
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime GetCurrentDateTime()
        {
            return DateTime.Now;
        }
    }
}