"use client";

import { useState } from "react";

import {
  BarChart3,
  CalendarDays,
  DollarSign,
  Download,
  FileText,
  Loader2,
  PlusCircle,
  Shield,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "Generated" | "Pending" | "Failed";
  downloadLink: string;
}

export default function ReportsPage() {
  const [recentReports, setRecentReports] = useState<Report[]>([
    {
      id: "rep-001",
      name: "Q1 2024 Biosecurity Compliance",
      type: "Biosecurity",
      date: "2024-03-31",
      status: "Generated",
      downloadLink: "#",
    },
    {
      id: "rep-002",
      name: "March Production Performance",
      type: "Production",
      date: "2024-04-05",
      status: "Generated",
      downloadLink: "#",
    },
    {
      id: "rep-003",
      name: "Annual Financial Summary 2023",
      type: "Financial",
      date: "2024-01-15",
      status: "Generated",
      downloadLink: "#",
    },
    {
      id: "rep-004",
      name: "April Water Quality Trends",
      type: "Water Quality",
      date: "2024-04-20",
      status: "Pending",
      downloadLink: "#",
    },
  ]);

  const [reportType, setReportType] = useState("");
  const [timeframe, setTimeframe] = useState("");

  const handleGenerateReport = () => {
    // In a real application, this would trigger an API call to generate a report
    // Simulate adding a new pending report
    const newReport: Report = {
      id: `rep-${Date.now()}`,
      name: `${reportType} Report (${timeframe})`,
      type: reportType,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      downloadLink: "#",
    };
    setRecentReports(prev => [newReport, ...prev]);
    alert(
      `Generating ${reportType} report for ${timeframe}. It will appear in the list shortly.`
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-600" />
            Farm Reports
          </CardTitle>
          <CardDescription>
            Generate and view comprehensive farm performance and biosecurity
            reports.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Report Generation Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PlusCircle className="h-5 w-5 text-green-600" />
            Get Your Custom Report
          </CardTitle>
          <CardDescription>
            Select report type and timeframe to create a new report.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="report-type"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FileText className="h-4 w-4 text-gray-600" />
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type" className="w-full h-12">
                  <SelectValue placeholder="Select Report Type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BFAR Compliance">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" /> BFAR Compliance Report
                    </div>
                  </SelectItem>
                  <SelectItem value="Biosecurity Performance">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-emerald-600" /> Biosecurity Performance Summary
                    </div>
                  </SelectItem>
                  <SelectItem value="Pond Health">
                    <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4 text-blue-600" /> Pond Health Trends
                    </div>
                  </SelectItem>
                  <SelectItem value="Feed & Resource">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" /> Feed & Resource Efficiency
                    </div>
                  </SelectItem>
                  <SelectItem value="Harvest Summary">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" /> Harvest Summary
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="timeframe"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <CalendarDays className="h-4 w-4 text-gray-600" />
                Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger id="timeframe" className="w-full h-12">
                  <SelectValue placeholder="Select Timeframe..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last Month">Last Month</SelectItem>
                  <SelectItem value="Last Quarter">Last Quarter</SelectItem>
                  <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                  <SelectItem value="Last Year">Last Year</SelectItem>
                  <SelectItem value="Custom Range">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleGenerateReport}
            disabled={!reportType || !timeframe}
            className="flex w-full items-center gap-2 h-12 text-base font-semibold"
          >
            <PlusCircle className="h-4 w-4" /> Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <CardDescription>
            View and download your previously generated reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          report.status === "Generated"
                            ? "bg-green-100 text-green-800"
                            : report.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {report.status === "Pending" && (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin inline" />
                        )}
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={report.status !== "Generated"}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet!</h3>
              <p className="text-gray-500">Generate your first report above to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
