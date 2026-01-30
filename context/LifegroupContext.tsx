import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, LifeGroup } from '../types';
import { MOCK_GROUPS } from '../constants';

interface LifegroupContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  myGroups: LifeGroup[];
  allGroups: LifeGroup[];
  joinRequestStatus: 'PENDING' | 'APPROVED' | 'NONE';
  sendJoinRequest: (groupId: string) => void;
  approveRequest: (userId: string) => void;
}

const LifegroupContext = createContext<LifegroupContextType | undefined>(undefined);

export const LifegroupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [myGroups, setMyGroups] = useState<LifeGroup[]>([]);
  const [allGroups] = useState<LifeGroup[]>(MOCK_GROUPS);
  const [joinRequestStatus, setJoinRequestStatus] = useState<'PENDING' | 'APPROVED' | 'NONE'>('NONE');

  const sendJoinRequest = (groupId: string) => {
    setJoinRequestStatus('PENDING');
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would wait for leader approval
      // For demo, we might just show pending
    }, 500);
  };

  const approveRequest = (userId: string) => {
    // Admin/Leader logic
  };

  return (
    <LifegroupContext.Provider value={{
      userRole,
      setUserRole,
      myGroups,
      allGroups,
      joinRequestStatus,
      sendJoinRequest,
      approveRequest
    }}>
      {children}
    </LifegroupContext.Provider>
  );
};

export const useLifegroup = () => {
  const context = useContext(LifegroupContext);
  if (!context) throw new Error('useLifegroup must be used within a LifegroupProvider');
  return context;
};