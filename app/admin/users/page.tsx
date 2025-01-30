import Pagination from "@/components/shared/pagination";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import ROLES from "@/lib/constants/roles";
import { deleteUser, getAllUsers } from "@/lib/actions/admin/admin.actions";
import DeleteDialog from "@/components/shared/delete-dialog";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users",
};

const UsersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = "1" } = await props.searchParams;
  const session = await auth();

  const users = await getAllUsers({ page: Number(page) });

  const Roles = ({ userRole }: any) => {
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
      <div className="h2-bold">Users</div>
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
                  <Button className="bg-slate-100 text-slate-700 px-4 py-2">
                    <Link href={`/admin/users/${user.id}`}>
                      <Edit2 height={10} width={10} />
                    </Link>
                  </Button>
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
