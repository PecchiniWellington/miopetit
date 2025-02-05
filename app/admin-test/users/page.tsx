import { auth } from "@/auth";
import DynamicButton from "@/components/dynamic-button";
import LayoutTitle from "@/components/layout-title";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/actions/admin/admin.actions";
import ROLES from "@/lib/constants/roles";
import { formatId } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import DownloadCSV from "../categories/download-csv";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users",
};

const UsersPage = async (props: {
  searchParams: {
    query: string;
    page: string;
    users: string;
  };
}) => {
  const searchParams = await props.searchParams;
  const session = await auth();

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const users = await getAllUsers({
    query: searchQuery,
    page,
  });

  const Roles = ({ userRole }: { userRole: string }) => {
    switch (userRole) {
      case ROLES.ADMIN:
        return (
          <Badge className="bg-blue-100 text-blue-700"> {ROLES.ADMIN}</Badge>
        );

      case ROLES.USER:
        return (
          <Badge className="bg-purple-100 text-purple-700"> {ROLES.USER}</Badge>
        );

      case ROLES.EDITOR:
        return (
          <Badge className="bg-orange-100 text-orange-700">
            {ROLES.EDITOR}
          </Badge>
        );

      case ROLES.CONTRIBUTOR:
        return (
          <Badge className="bg-teal-100 text-teal-700">
            {ROLES.CONTRIBUTOR}
          </Badge>
        );

      default:
        return <div>No role</div>;
    }
  };

  // remove user logged in from the list
  users.data = users.data.filter((user) => user.id !== session?.user?.id);

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <LayoutTitle title="Users" />
          {searchQuery && (
            <div>
              Filtered by <i>&quot;{searchQuery}&quot;</i>{" "}
              <Link href="/admin/products">
                <DynamicButton>Remove Filter</DynamicButton>
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <DynamicButton>
            <Link href="/admin/users/create">Create User</Link>
          </DynamicButton>
          <DownloadCSV csvData={users.data} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Roles userRole={user.role} />
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <DynamicButton>
                    <Link href={`/admin/users/${user.id}`}>
                      <Edit2 height={10} width={10} />
                    </Link>
                  </DynamicButton>
                  <DeleteDialog action={deleteUser} id={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
