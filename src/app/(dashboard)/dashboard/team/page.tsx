import { Input } from '@/components/ui/input'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { MoreHorizontal, Search } from 'lucide-react'
import { TeamHeader } from './components/TeamHeader'

export default async function TeamPage() {
  // Chamada via API Handler (Camada de Integração)
  const members = await teamHandler.list()

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <TeamHeader
        totalMembers={members.length}
        adminsCount={members.filter((m) => m.canManageTeam).length}
      />

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            className="pl-12 h-12 bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-blue-400/20 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="h-12 bg-gray-50/50 border-none rounded-xl px-4 text-sm font-bold text-gray-500 outline-none focus:ring-2 focus:ring-blue-400/20 transition-all">
            <option>Todas as Roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                  Colaborador
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                  Data de Inscrição
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 font-bold text-sm border-2 border-white shadow-sm overflow-hidden">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.initials
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-400 transition-colors">
                          {member.fullName}
                        </p>
                        <p className="text-xs font-medium text-gray-400 italic lowercase">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${member.roleBadgeStyles}`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-500">
                      {member.formattedJoinDate}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                      <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
                        Ativo
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-300 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
