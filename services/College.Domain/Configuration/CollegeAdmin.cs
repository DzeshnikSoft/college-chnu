namespace College.Domain.Configuration;

public interface ICollegeAdmin
{
    public string Login { get; set; }
    public string Password { get; set; }
}

public class CollegeAdmin : ICollegeAdmin
{
    public string Login { get; set; }
    public string Password { get; set; }
}