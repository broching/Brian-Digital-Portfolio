using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class achievements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffa0484a-d9cb-417d-a12a-9af8d163ee36");

            migrationBuilder.AddColumn<string>(
                name: "Attachments",
                table: "Achievement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Achievement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "957f582f-8819-4a92-b12a-727d15ee6218", null, "User", "USER" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "957f582f-8819-4a92-b12a-727d15ee6218");

            migrationBuilder.DropColumn(
                name: "Attachments",
                table: "Achievement");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Achievement");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ffa0484a-d9cb-417d-a12a-9af8d163ee36", null, "User", "USER" });
        }
    }
}
