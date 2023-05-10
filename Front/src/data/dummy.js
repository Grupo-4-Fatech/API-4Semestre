import React from 'react';
import { FiEdit, FiUserPlus, FiUsers, FiUser,FiArchive,FiCheckSquare} from 'react-icons/fi';
import { MdOutlineViewAgenda, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsKanban, } from 'react-icons/bs';


export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  {
    headerText: 'Novo',
    keyField: 'New',
    allowToggle: true
  },

  {
    headerText: 'Em espera',
    keyField: 'OnHold',
    allowToggle: true
  },

  {
    headerText: 'Feito',
    keyField: 'Done',
    allowToggle: true
  },
];



// SideBar 
export const linksPt = [
  {
    title: 'Chamados',
    links: [
      {
        title: 'Criar Chamado',
        name: 'ticket/create',
        icon: <FiEdit />,
        permission: 3,
      },
      {
        title: 'Visualizar Chamados',
        name: 'ViewTicket',
        icon: <MdOutlineViewAgenda />,
        permission: 3,
      },
      {
        title: 'Chamados Arquivados',
        name: 'ArchivedTicket',
        icon: <FiArchive />,
        permission: 2,
      },
    ],
  },
  {
    title: 'Usuário',
    links: [
      {
        title: 'Criar Usuário',
        name: 'user/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'Visualizar Usuários',
        name: 'user/view',
        icon: <MdOutlinePermContactCalendar />,
        permission: 1,
      }
    ]

  },
  {
    title: 'Equipes',
    links: [
      {
        title: 'Criar Equipes',
        name: 'teams/create',
        icon: <FiUserPlus />,
        permission: 1,
      },

      {
        title: 'Visualizar Equipes',
        name: 'teams/view',
        icon: <FiUsers />,
        permission: 1,
      },
      {
        title: 'Kanban',
        name: 'kanban',
        icon: <BsKanban />,
        permission: 3,
      },

    ]
  },
  {
    title: 'Grupos',
    links: [
      {
        title: 'Criar Grupos',
        name: 'group/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'Visualizar Grupos',
        name: 'group/viewGroup',
        icon: <FiUsers />,
        permission: 1,
      }
    ]
  },
  {
    title: 'Árvore de aprovação',
    links: [
      {
        title:'Criar árvore',
        name: 'tree/create',
        icon: <FiCheckSquare/>,
        permission: 1,
      }
    ]
  }

];
export const linksEn = [
  {
    title: 'Tickets',
    links: [
      {
        title: 'saokdoas',
        name: 'ticket/create',
        icon: <FiEdit />,
        permission: 3,
      },
      {
        title: 'Visualizar Chamados',
        name: 'ViewTicket',
        icon: <MdOutlineViewAgenda />,
        permission: 3,
      },
      {
        title: 'Chamados Arquivados',
        name: 'ArchivedTicket',
        icon: <FiArchive />,
        permission: 2,
      },
    ],
  },
  {
    title: 'Usuário',
    links: [
      {
        title: 'Criar Usuário',
        name: 'user/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'Visualizar Usuários',
        name: 'user/view',
        icon: <MdOutlinePermContactCalendar />,
        permission: 1,
      }
    ]

  },
  {
    title: 'Equipes',
    links: [
      {
        title: 'Criar Equipes',
        name: 'teams/create',
        icon: <FiUserPlus />,
        permission: 1,
      },

      {
        title: 'Visualizar Equipes',
        name: 'teams/view',
        icon: <FiUsers />,
        permission: 1,
      },
      {
        title: 'Kanban',
        name: 'kanban',
        icon: <BsKanban />,
        permission: 3,
      },

    ]
  },
  {
    title: 'Grupos',
    links: [
      {
        title: 'Criar Grupos',
        name: 'group/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'Visualizar Grupos',
        name: 'group/viewGroup',
        icon: <FiUsers />,
        permission: 1,
      }
    ]
  },
  {
    title: 'Árvore de aprovação',
    links: [
      {
        title:'Criar árvore',
        name: 'tree/create',
        icon: <FiCheckSquare/>,
        permission: 1,
      }
    ]
  }

];


export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <FiUser />,
    title: 'Meu Perfil',
    desc: 'Configuração da conta',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];

