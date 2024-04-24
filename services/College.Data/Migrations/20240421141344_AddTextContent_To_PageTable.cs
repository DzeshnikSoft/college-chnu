using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace College.Data.Migrations
{
    public partial class AddTextContent_To_PageTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TextContent",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TextContent",
                table: "Pages");
        }
    }
}
