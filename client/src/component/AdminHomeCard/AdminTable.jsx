import React, { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { selectCurrentToken } from "../../context/authReducer";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../api/axios";

const AdminTable = () => {
  const TABLE_HEAD = [
    "NO",
    "Date",
    "Transaction ID",
    "Student",
    "Courses",
    "Chef Name",
    "Course Price",
    "Payment Status",
  ];
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/admin/adminTable", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response adminTable", response);
        setPayments(response.data.payment);
        setLoading(false); // Set loading to false once data is received
      } catch (error) {
        console.log(error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [token]); // Added token as a dependency
  const cardStyle4 = {
    background:
      "linear-gradient(to right, hsl(210, 40%, 95%), hsl(0, 40%, 95%), hsl(60, 100%, 95%))",
  };
  return (
    <Card className="h-full w-full" style={cardStyle4}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {loading ? (
          <p>Loading...</p>
        ) : payments.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(
                (
                  { _id, user_id, chef_id, course_id, amount, date, isDivided },
                  index
                ) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>{index + 1}</td>
                      <td className={classes}>
                        {new Date(date).toLocaleDateString()}
                      </td>
                      <td className={classes}>{_id}</td>
                      <td className={classes}>{user_id?.username || "N/A"}</td>

                      <td className={classes}>
                        {course_id && course_id.title}
                      </td>
                      <td className={classes}>{chef_id.username}</td>
                      <td className={classes}>{amount}</td>
                      <td className={classes}>
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={isDivided ? "paid" : "pending"}
                          color={isDivided ? "green" : "amber"}
                        />
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm" color="blue">
            2
          </IconButton>
          <IconButton variant="outlined" size="sm">
            3
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminTable;
