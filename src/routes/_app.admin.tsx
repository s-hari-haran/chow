import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QRCode from "qrcode";
import { Plus, QrCode, Users, MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin")({
  beforeLoad: async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) throw redirect({ to: "/login" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin") || u.user.email === "chowkidarbengaluru@gmail.com";
    if (!isAdmin) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Admin — GuardCheck" }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Manage sites and guards.</p>
      </div>
      <Tabs defaultValue="sites">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="guards">Guards</TabsTrigger>
        </TabsList>
        <TabsContent value="sites" className="mt-4">
          <SitesTab />
        </TabsContent>
        <TabsContent value="guards" className="mt-4">
          <GuardsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SitesTab() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [qrPreview, setQrPreview] = useState<{ id: string; img: string; value: string } | null>(
    null,
  );

  const { data: sites } = useQuery({
    queryKey: ["admin-sites"],
    queryFn: async () => {
      const { data } = await supabase
        .from("sites")
        .select("id, site_name, location, qr_code_value")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const create = async () => {
    if (!siteName || !location || !qrValue) return toast.error("All fields required");
    setSaving(true);
    const { error } = await supabase.from("sites").insert({
      site_name: siteName.trim(),
      location: location.trim(),
      qr_code_value: qrValue.trim(),
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Site created");
    setSiteName("");
    setLocation("");
    setQrValue("");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin-sites"] });
  };

  const showQr = async (s: { id: string; qr_code_value: string }) => {
    const img = await QRCode.toDataURL(s.qr_code_value, { width: 320, margin: 2 });
    setQrPreview({ id: s.id, img, value: s.qr_code_value });
  };

  return (
    <div className="space-y-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add site
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>New site</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Site name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <Label>QR code value (unique)</Label>
              <Input
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                placeholder="SITE-XYZ-001"
              />
            </div>
            <Button className="w-full" onClick={create} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {sites?.map((s) => (
        <Card key={s.id} className="flex items-center gap-3 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{s.site_name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {s.location} · {s.qr_code_value}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => showQr(s)}>
            <QrCode className="mr-1 h-4 w-4" /> QR
          </Button>
        </Card>
      ))}
      {sites?.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">No sites yet.</p>
      )}

      <Dialog open={!!qrPreview} onOpenChange={(o) => !o && setQrPreview(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Site QR Code</DialogTitle>
          </DialogHeader>
          {qrPreview && (
            <div className="flex flex-col items-center gap-3">
              <img src={qrPreview.img} alt="QR" className="rounded-lg border" />
              <p className="text-center text-xs text-muted-foreground">
                Print this and place at the site entrance.
              </p>
              <code className="rounded bg-muted px-2 py-1 text-xs">{qrPreview.value}</code>
              <a
                href={qrPreview.img}
                download={`qr-${qrPreview.value}.png`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Download PNG
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GuardsTab() {
  const qc = useQueryClient();
  const [selectedGuard, setSelectedGuard] = useState<any>(null);

  const { data: guards } = useQuery({
    queryKey: ["admin-guards"],
    queryFn: async () => {
      const { data } = await supabase
        .from("guards")
        .select("id, name, email, phone, base_salary, site_id, site:sites(site_name), created_at")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: sites } = useQuery({
    queryKey: ["admin-sites-list"],
    queryFn: async () => {
      const { data } = await supabase.from("sites").select("id, site_name").order("site_name");
      return data ?? [];
    },
  });

  return (
    <div className="space-y-3">
      {guards?.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No guards yet. They'll appear after they sign up.
        </p>
      )}
      {guards?.map((g) => (
        <Card key={g.id} className="overflow-hidden shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{g.name}</p>
              <p className="truncate text-xs text-muted-foreground">{g.email}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setSelectedGuard(g)}>
              Manage
            </Button>
          </div>
          <div className="bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
            {g.site?.site_name ? `📍 ${g.site.site_name}` : "⚠️ Unassigned"} · Salary: ₹{g.base_salary}
          </div>
        </Card>
      ))}

      {selectedGuard && (
        <GuardDetailsDialog
          guard={selectedGuard}
          sites={sites ?? []}
          onClose={() => setSelectedGuard(null)}
          onUpdate={() => {
            qc.invalidateQueries({ queryKey: ["admin-guards"] });
          }}
        />
      )}
    </div>
  );
}

function GuardDetailsDialog({ guard, sites, onClose, onUpdate }: any) {
  const qc = useQueryClient();
  const [siteId, setSiteId] = useState(guard.site_id ?? "none");
  const [salary, setSalary] = useState(guard.base_salary);
  const [name, setName] = useState(guard.name);
  const [updating, setUpdating] = useState(false);

  const { data: attendance, refetch: refetchAttendance } = useQuery({
    queryKey: ["admin-guard-attendance", guard.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("attendance")
        .select("id, date, marked_at, status, site:sites(site_name)")
        .eq("guard_id", guard.id)
        .order("date", { ascending: false })
        .limit(30);
      return data ?? [];
    },
  });

  const saveProfile = async () => {
    setUpdating(true);
    const { error } = await supabase
      .from("guards")
      .update({
        name,
        site_id: siteId === "none" ? null : siteId,
        base_salary: Number(salary),
      })
      .eq("id", guard.id);
    setUpdating(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Profile updated");
      onUpdate();
    }
  };

  const updateAttendanceTime = async (id: string, newTime: string) => {
    // Combine date from record with new time
    const record = attendance?.find((r) => r.id === id);
    if (!record) return;
    
    const [hours, minutes] = newTime.split(":");
    const date = new Date(record.marked_at);
    date.setHours(parseInt(hours), parseInt(minutes));

    const { error } = await supabase
      .from("attendance")
      .update({ marked_at: date.toISOString() })
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Time updated");
      refetchAttendance();
    }
  };

  const updateAttendanceStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("attendance")
      .update({ status })
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Status updated");
      refetchAttendance();
    }
  };

  return (
    <Dialog open={true} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Guard: {guard.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Assigned Site</Label>
              <Select value={siteId} onValueChange={setSiteId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {sites.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>{s.site_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Monthly Salary (₹)</Label>
              <Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </div>
            <Button className="w-full" onClick={saveProfile} disabled={updating}>
              {updating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </TabsContent>
          
          <TabsContent value="attendance" className="pt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance?.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-xs font-medium">
                        {format(new Date(r.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="time"
                          className="h-8 w-24 text-xs"
                          defaultValue={format(new Date(r.marked_at), "HH:mm")}
                          onBlur={(e) => updateAttendanceTime(r.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={r.status}
                          onValueChange={(v) => updateAttendanceStatus(r.id, v)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="half-day">Half Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                  {attendance?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
