import React from 'react';
import { FiEdit, FiUserPlus, FiUsers, FiUser, FiArchive, FiCheckSquare } from 'react-icons/fi';
import { MdOutlineViewAgenda, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsKanban, } from 'react-icons/bs';
import { AiOutlinePieChart, AiOutlineBarChart } from 'react-icons/ai'

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

export const kanbanGridPt = [
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
export const kanbanGridEn = [
  {
    headerText: 'New',
    keyField: 'New',
    allowToggle: true
  },

  {
    headerText: 'On hold',
    keyField: 'OnHold',
    allowToggle: true
  },

  {
    headerText: 'Done',
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
    title: 'Times',
    links: [
      {
        title: 'Criar Times',
        name: 'teams/create',
        icon: <FiUserPlus />,
        permission: 1,
      },

      {
        title: 'Visualizar Times',
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
    title: 'Equipes',
    links: [
      {
        title: 'Criar Equipes',
        name: 'group/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'Visualizar Equipes',
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
        title: 'Gerenciar árvore',
        name: 'tree/create',
        icon: <FiCheckSquare />,
        permission: 1,
      }
    ]
  },
  {
    title: 'Gráficos',
    links: [
      {
        title: 'Pizza',
        name: 'pie',
        icon: <AiOutlinePieChart />,
        permission: 3,
      },
      {
        title: 'Barra',
        name: 'bar',
        icon: <AiOutlineBarChart />,
        permission: 3
      }
    ]
  }

];
export const linksEn = [
  {
    title: 'Tickets',
    links: [
      {
        title: 'Create tickets',
        name: 'ticket/create',
        icon: <FiEdit />,
        permission: 3,
      },
      {
        title: 'View Tickets',
        name: 'ViewTicket',
        icon: <MdOutlineViewAgenda />,
        permission: 3,
      },
      {
        title: 'Archived Tickets',
        name: 'ArchivedTicket',
        icon: <FiArchive />,
        permission: 2,
      },
    ],
  },
  {
    title: 'User',
    links: [
      {
        title: 'Create User',
        name: 'user/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'View User',
        name: 'user/view',
        icon: <MdOutlinePermContactCalendar />,
        permission: 1,
      }
    ]

  },
  {
    title: 'Teams',
    links: [
      {
        title: 'Create Team',
        name: 'teams/create',
        icon: <FiUserPlus />,
        permission: 1,
      },

      {
        title: 'View Team',
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
    title: 'Group',
    links: [
      {
        title: 'Create Group',
        name: 'group/create',
        icon: <FiUserPlus />,
        permission: 1,
      },
      {
        title: 'View Group',
        name: 'group/viewGroup',
        icon: <FiUsers />,
        permission: 1,
      }
    ]
  },
  {
    title: 'Approval tree',
    links: [
      {
        title: 'Manage tree',
        name: 'tree/create',
        icon: <FiCheckSquare />,
        permission: 1,
      }
    ]
  },
  {
    title: 'Charts',
    links: [
      {
        title: 'Pie',
        name: 'pie',
        icon: <AiOutlinePieChart />,
        permission: 3,
      },
      {
        title: 'Bar',
        name: 'bar',
        icon: <AiOutlineBarChart />,
        permission: 3
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

export const userProfileDataPt = [
  {
    icon: <FiUser />,
    title: 'Meu Perfil',
    desc: 'Configuração da conta',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];

export const userProfileDataEn = [
  {
    icon: <FiUser />,
    title: 'My profile',
    desc: 'Account setup',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];

// Chart
export const pieChartData = [
  { x: 'Labour', y: 18, text: '18%' },
  { x: 'Legal', y: 8, text: '8%' },
  { x: 'Production', y: 15, text: '15%' },
  { x: 'License', y: 11, text: '11%' },
  { x: 'Facilities', y: 18, text: '18%' },
  { x: 'Taxes', y: 14, text: '14%' },
  { x: 'Insurance', y: 16, text: '16%' },
];

export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
  labelStyle: { color: 'rgba(255, 255, 255, 0.75)' }
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0.5 },
  majorTickLines: { width: 0 },
  //lineStyle: { width: 0 },
};

export const barCustomSeries = [
  {
    dataSource: [],
    xName: 'x',
    yName: 'y',
    name: '',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
    fill: '',
  },
];