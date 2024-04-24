using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace College.Data.Migrations
{
    public partial class AddTextContent_To_NewsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TextContent",
                table: "News",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TextContent",
                table: "News");
        }
    }
}
