import {ProfileView} from '../components/ProfileView';
import {DocumentSection} from '../components/DocumentSection.tsx';
import { useUIContext } from "../contexts/ui.context.tsx";
import { useAuth, Student, Admin, Hr } from '../contexts/auth.context.tsx';

export function Profile() {
  const { isSidebarVisible } = useUIContext();
  const { user } = useAuth();
  return (
    <div className={`flex-1 bg-gray-50 transition-all duration-300 ${
      isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
    }`}>
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProfileView user={user}/>
          <div className="space-y-8">
            <DocumentSection 
              title="Resume" 
              documents={[
                { name: 'Resume.pdf', type: 'pdf' },
                { name: 'Cover Letter.pdf', type: 'pdf' },
                { name: 'Recommendation Letter.pdf', type: 'pdf' },
                { name: 'Certifications.pdf', type: 'pdf' }
              ]}
            />
            <DocumentSection 
              title="Identification Documents" 
              documents={[
                { name: 'ID Card', type: 'id', editable: true },
                { name: 'Passport', type: 'passport', editable: true },
                { name: 'Residence Permit', type: 'permit', editable: true }
              ]}
              showUpload
            />
          </div>
        </div>
      </main>
    </div>
  );
}