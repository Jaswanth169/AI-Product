import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, DollarSign, Users, Target, Megaphone, Package, Shield, BarChart3, Zap, Loader, CheckCircle, FileText, X, ArrowLeft, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const colors = {
  primary: '#2C3E50',
  secondary: '#34495E',
  accent: '#3498DB',
  success: '#27AE60',
  warning: '#F39C12',
  danger: '#E74C3C',
  background: '#ECF0F1',
  card: '#FFFFFF',
  text: { primary: '#2C3E50', secondary: '#7F8C8D', light: '#95A5A6' },
  border: '#BDC3C7'
};

const iconMap = {
  Target, Megaphone, Users, DollarSign, TrendingUp, Zap, Shield, Package, Brain, BarChart3
};

const DomainCard = ({ domain, agentCount, onClick }) => {
  const [hover, setHover] = useState(false);
  const Icon = iconMap[domain.icon] || Brain;
  
  return (
    <div 
      style={{
        background: '#FFF',
        borderRadius: '12px',
        padding: '2rem',
        border: `2px solid ${hover ? domain.color : colors.border}`,
        boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div 
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: `${domain.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${domain.color}`
          }}
        >
          <Icon size={28} style={{ color: domain.color }} />
        </div>
        <div 
          style={{
            background: `${domain.color}20`,
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: domain.color
          }}
        >
          {agentCount} Agents
        </div>
      </div>
      
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: '0.75rem',
        lineHeight: '1.3'
      }}>
        {domain.name}
      </h3>
      
      <p style={{
        fontSize: '0.9375rem',
        color: colors.text.secondary,
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        minHeight: '60px'
      }}>
        {domain.description}
      </p>
      
      <button 
        style={{
          width: '100%',
          padding: '0.875rem',
          background: hover ? domain.color : colors.background,
          color: hover ? '#FFF' : colors.text.primary,
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        View Agents
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

const AgentCard = ({ agent, onRun, isRunning, result }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      style={{
        background: '#FFF',
        borderRadius: '8px',
        padding: '1.5rem',
        border: `1px solid ${hover ? colors.accent : colors.border}`,
        boxShadow: hover ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => !isRunning && onRun(agent.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: colors.text.primary,
          lineHeight: '1.4',
          flex: 1
        }}>
          {agent.name}
        </h3>
        {result ? <CheckCircle size={20} style={{ color: colors.success }} /> : 
         isRunning ? <Loader size={20} style={{ color: colors.accent, animation: 'spin 1s linear infinite' }} /> : null}
      </div>
      
      <button 
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          background: result ? colors.success : isRunning ? colors.text.light : colors.accent,
          color: '#FFF',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          opacity: isRunning ? 0.7 : 1
        }}
        onClick={(e) => { e.stopPropagation(); !isRunning && onRun(agent.id) }}
        disabled={isRunning}
      >
        {isRunning ? 'Processing...' : result ? 'View Analysis' : 'Run Agent'}
      </button>
    </div>
  );
};

const ResultModal = ({ agent, result, onClose }) => {
  if (!result) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(44,62,80,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#FFF',
          borderRadius: '8px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.text.primary }}>
            {agent.name}
          </h2>
          <button 
            style={{
              background: 'none',
              border: 'none',
              color: colors.text.secondary,
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              borderRadius: '4px'
            }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          <pre style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.7',
            fontSize: '0.9375rem',
            color: colors.text.primary,
            fontFamily: "'SF Mono','Monaco','Courier New',monospace",
            margin: 0
          }}>
            {result.result}
          </pre>
        </div>
        
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8125rem', color: colors.text.secondary }}>
            Generated: {new Date(result.timestamp).toLocaleString()}
          </span>
          <button 
            style={{
              padding: '0.75rem 1.5rem',
              background: colors.accent,
              color: '#FFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AgentLaunchApp() {
  const [step, setStep] = useState('welcome');
  const [domains, setDomains] = useState({});
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [projectData, setProjectData] = useState({
    product_name: '',
    product_description: '',
    product_features: '',
    target_price: '',
    budget: '',
    industry: 'electronics'
  });
  const [runningAgents, setRunningAgents] = useState(new Set());
  const [agentResults, setAgentResults] = useState({});
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await fetch(`${API_URL}/domains`);
      const data = await response.json();
      setDomains(data.domains);
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch(`${API_URL}/project/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectData,
          product_features: projectData.product_features.split(',').map(f => f.trim())
        })
      });
      const data = await response.json();
      setProjectId(data.project_id);
      setStep('domains');
    } catch (error) {
      alert('Error creating project');
    }
  };

  const handleRunAgent = async (agentId) => {
    if (agentResults[agentId]) {
      const agent = Object.values(domains)
        .flatMap(d => d.agents)
        .find(a => a.id === agentId);
      setSelectedAgent({ id: agentId, name: agent?.name });
      return;
    }

    setRunningAgents(prev => new Set([...prev, agentId]));
    
    try {
      const response = await fetch(`${API_URL}/agent/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, agent_id: agentId })
      });
      const data = await response.json();
      setAgentResults(prev => ({ ...prev, [agentId]: data }));
      setSelectedAgent({ id: agentId, name: data.agent_name });
    } catch (error) {
      alert('Error running agent');
    } finally {
      setRunningAgents(prev => {
        const newSet = new Set(prev);
        newSet.delete(agentId);
        return newSet;
      });
    }
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    setShowSummary(true);
    
    try {
      const response = await fetch(`${API_URL}/project/${projectId}/summary`);
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary('Error generating summary');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGetRecommendations = async () => {
    setLoadingRecommendations(true);
    setShowRecommendations(true);
    
    try {
      const response = await fetch(`${API_URL}/project/${projectId}/recommendations`);
      const data = await response.json();
      
      if (data.error) {
        setRecommendations(`Error: ${data.error}`);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations('Error generating recommendations. Please try again.');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const getTotalAgents = () => {
    return Object.values(domains).reduce((sum, domain) => sum + domain.agents.length, 0);
  };

  const getCompletedAgents = () => {
    return Object.keys(agentResults).length;
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.primary,
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1000px', textAlign: 'center', color: '#FFF' }}>
          <Brain size={64} style={{ color: colors.accent, margin: '0 auto 2rem' }} />
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
            lineHeight: '1.1'
          }}>
            AgentLaunch AI
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: colors.text.light,
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Enterprise-grade multi-agent platform for intelligent product launch strategy
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: colors.accent
              }}>
                10
              </div>
              <div style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.text.light,
                fontWeight: '500'
              }}>
                Domain Areas
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: colors.success
              }}>
                40
              </div>
              <div style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.text.light,
                fontWeight: '500'
              }}>
                Specialized Agents
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: colors.warning
              }}>
                1
              </div>
              <div style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.text.light,
                fontWeight: '500'
              }}>
                Unified Platform
              </div>
            </div>
          </div>
          
          <button 
            style={{
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              background: colors.accent,
              color: '#FFF',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onClick={() => setStep('create')}
          >
            Begin Analysis
          </button>
        </div>
      </div>
    );
  }

  // Product Details Form
  if (step === 'create') {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.background,
        fontFamily: "'Inter','Segoe UI',sans-serif"
      }}>
        <div style={{
          background: colors.primary,
          borderBottom: `1px solid ${colors.border}`,
          padding: '1.5rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Brain size={32} style={{ color: colors.accent }} />
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#FFF',
              letterSpacing: '-0.02em'
            }}>
              AgentLaunch AI
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: '0.5rem'
          }}>
            Tell us about your product
          </h1>
          <p style={{
            fontSize: '1rem',
            color: colors.text.secondary,
            marginBottom: '2rem'
          }}>
            Provide details about your product to get personalized insights from our AI agents
          </p>
          
          <div style={{
            background: '#FFF',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: '0.5rem'
              }}>
                Product Name
              </label>
              <input
                type="text"
                value={projectData.product_name}
                onChange={(e) => setProjectData({ ...projectData, product_name: e.target.value })}
                placeholder="e.g., SmartHome Hub Pro"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: '0.5rem'
              }}>
                Product Description
              </label>
              <textarea
                value={projectData.product_description}
                onChange={(e) => setProjectData({ ...projectData, product_description: e.target.value })}
                placeholder="Describe your product and its main purpose..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: '0.5rem'
              }}>
                Key Features (comma-separated)
              </label>
              <input
                type="text"
                value={projectData.product_features}
                onChange={(e) => setProjectData({ ...projectData, product_features: e.target.value })}
                placeholder="e.g., Voice control, Energy monitoring, App integration"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: colors.text.primary,
                  marginBottom: '0.5rem'
                }}>
                  Target Price
                </label>
                <input
                  type="number"
                  value={projectData.target_price}
                  onChange={(e) => setProjectData({ ...projectData, target_price: e.target.value })}
                  placeholder="299"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '0.9375rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: colors.text.primary,
                  marginBottom: '0.5rem'
                }}>
                  Marketing Budget
                </label>
                <input
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                  placeholder="50000"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '0.9375rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: '0.5rem'
              }}>
                Industry
              </label>
              <select
                value={projectData.industry}
                onChange={(e) => setProjectData({ ...projectData, industry: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit',
                  background: '#FFF'
                }}
              >
                <option value="electronics">Electronics</option>
                <option value="software">Software</option>
                <option value="healthcare">Healthcare</option>
                <option value="consumer_goods">Consumer Goods</option>
                <option value="automotive">Automotive</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setStep('welcome')}
                style={{
                  padding: '0.875rem 1.5rem',
                  background: colors.background,
                  color: colors.text.primary,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ArrowLeft size={18} />
                Back
              </button>
              
              <button
                onClick={handleCreateProject}
                disabled={!projectData.product_name || !projectData.product_description}
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  background: projectData.product_name && projectData.product_description ? colors.accent : colors.border,
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  cursor: projectData.product_name && projectData.product_description ? 'pointer' : 'not-allowed'
                }}
              >
                Continue to Agent Domains
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Domain Selection Screen
  if (step === 'domains') {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.background,
        fontFamily: "'Inter','Segoe UI',sans-serif"
      }}>
        <div style={{
          background: colors.primary,
          borderBottom: `1px solid ${colors.border}`,
          padding: '1.5rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Brain size={32} style={{ color: colors.accent }} />
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#FFF',
                  letterSpacing: '-0.02em'
                }}>
                  {projectData.product_name}
                </div>
                <div style={{ fontSize: '0.875rem', color: colors.text.light }}>
                  Select a domain to run its agents
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                color: '#FFF',
                fontSize: '0.875rem'
              }}>
                {getCompletedAgents()} / {getTotalAgents()} Agents Completed
              </div>
              
              <button
                onClick={handleGetRecommendations}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: colors.warning,
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Brain size={18} />
                Get AI Insights
              </button>
              
              {getCompletedAgents() > 0 && (
                <button
                  onClick={handleGenerateSummary}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: colors.success,
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FileText size={18} />
                  Generate Summary
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: '1.5rem'
          }}>
            Agent Domains
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {Object.entries(domains).map(([key, domain]) => (
              <DomainCard
                key={key}
                domain={domain}
                agentCount={domain.agents.length}
                onClick={() => {
                  setSelectedDomain(key);
                  setStep('agents');
                }}
              />
            ))}
          </div>
        </div>
        
        {showSummary && (
          <ResultModal
            agent={{ name: 'Executive Summary' }}
            result={{ result: loadingSummary ? 'Generating summary...' : summary, timestamp: new Date().toISOString() }}
            onClose={() => setShowSummary(false)}
          />
        )}
        
        {showRecommendations && (
          <ResultModal
            agent={{ name: 'AI Agent Recommendations' }}
            result={{ result: loadingRecommendations ? 'Analyzing your product and generating recommendations...' : recommendations, timestamp: new Date().toISOString() }}
            onClose={() => setShowRecommendations(false)}
          />
        )}
      </div>
    );
  }

  // Agents List Screen
  if (step === 'agents' && selectedDomain) {
    const domain = domains[selectedDomain];
    const Icon = iconMap[domain.icon] || Brain;
    
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.background,
        fontFamily: "'Inter','Segoe UI',sans-serif"
      }}>
        <div style={{
          background: colors.primary,
          borderBottom: `1px solid ${colors.border}`,
          padding: '1.5rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setStep('domains')}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFF',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowLeft size={24} />
              </button>
              
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: `${domain.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${domain.color}`
                }}
              >
                <Icon size={24} style={{ color: domain.color }} />
              </div>
              
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#FFF',
                  letterSpacing: '-0.02em'
                }}>
                  {domain.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: colors.text.light }}>
                  {domain.agents.length} specialized agents
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
          <div style={{
            background: `${domain.color}10`,
            border: `1px solid ${domain.color}40`,
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '0.9375rem',
              color: colors.text.primary,
              lineHeight: '1.6',
              margin: 0
            }}>
              {domain.description}
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {domain.agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onRun={handleRunAgent}
                isRunning={runningAgents.has(agent.id)}
                result={agentResults[agent.id]}
              />
            ))}
          </div>
        </div>
        
        {selectedAgent && agentResults[selectedAgent.id] && (
          <ResultModal
            agent={selectedAgent}
            result={agentResults[selectedAgent.id]}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </div>
    );
  }

  return null;
}
