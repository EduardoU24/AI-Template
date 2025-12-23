
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, User as UserIcon, Check, X, Shield, ShieldAlert } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { UserService } from '@/service/users';
import { IUserExtended, UserRoleType, UserStatusFlags } from '@/data/users';

export default function UsersPage() {
  const [users, setUsers] = useState<IUserExtended[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Quick Edit State
  const [editForm, setEditForm] = useState<Partial<IUserExtended>>({});

  const fetchUsers = async () => {
    setIsLoading(true);
    // Fix: Using findAll instead of getAll as defined in createService (line 19)
    const res = await UserService.findAll();
    if (res.data) setUsers(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: IUserExtended) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async (id: string) => {
    // Optimistic Update
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...editForm } as IUserExtended : u));
    setEditingId(null);
    
    // API Call
    await UserService.update(id, editForm);
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to remove this user?")) return;
    setUsers(prev => prev.filter(u => u.id !== id));
    await UserService.delete(id);
  };

  const getStatusColor = (status: UserStatusFlags) => {
    if (status & UserStatusFlags.Active) return 'bg-green-500/10 text-green-400';
    if (status & UserStatusFlags.Suspended) return 'bg-red-500/10 text-red-400';
    if (status & UserStatusFlags.Pending) return 'bg-yellow-500/10 text-yellow-400';
    return 'bg-slate-700 text-slate-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white">User Management</h1>
           <p className="text-slate-400 text-sm">Manage system access and roles.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Login</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map(user => {
              const isEditing = editingId === user.id;

              return (
                <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        {user.avatar ? <img src={user.avatar} alt="" /> : <UserIcon className="w-5 h-5 text-slate-500" />}
                      </div>
                      <div>
                        {isEditing ? (
                          <input 
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-white w-32 mb-1"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                          />
                        ) : (
                          <div className="font-medium text-slate-200">{user.name}</div>
                        )}
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                     <div className="flex gap-1">
                        {(user.role & UserRoleType.Admin) ? <Badge color="bg-purple-500/10 text-purple-400">Admin</Badge> : null}
                        {(user.role & UserRoleType.User) ? <Badge color="bg-blue-500/10 text-blue-400">User</Badge> : null}
                        {(user.role & UserRoleType.Guest) ? <Badge>Guest</Badge> : null}
                     </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {(user.status & UserStatusFlags.Active) ? "Active" : 
                       (user.status & UserStatusFlags.Suspended) ? "Suspended" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleSave(user.id)} className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={handleCancel} className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                         <button onClick={() => handleEdit(user)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <div className="p-8 text-center text-slate-500">Loading users...</div>}
      </Card>
    </div>
  );
}
