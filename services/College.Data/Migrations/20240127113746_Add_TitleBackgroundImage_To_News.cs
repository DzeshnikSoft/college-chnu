using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace College.Data.Migrations
{
    public partial class Add_TitleBackgroundImage_To_News : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TitleBackgroundImageId",
                table: "News",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_TitleBackgroundImageId",
                table: "News",
                column: "TitleBackgroundImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Images_TitleBackgroundImageId",
                table: "News",
                column: "TitleBackgroundImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Images_TitleBackgroundImageId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_TitleBackgroundImageId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "TitleBackgroundImageId",
                table: "News");
        }
    }
}
